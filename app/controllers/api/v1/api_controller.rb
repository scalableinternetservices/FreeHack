
module Api::V1
  class ApiController < ApplicationController
    include ActionController::Cookies
    include DeviseTokenAuth::Concerns::SetUserByToken

    def authenticate_current_user
       head :unauthorized if get_current_user.nil?
    end
    
    def render_as_user(content)
      render json: content, current_user_id: @current_user.id
    end
    
    def home
      render html: File.read("public/index.html").html_safe
    end

    # manual override current_user check for authentication
    # https://github.com/lynndylanhurley/devise_token_auth/issues/74
    def get_current_user
      puts cookies
      return nil unless cookies[:authHeaders]
      auth_headers = JSON.parse cookies[:authHeaders]

      expiration_datetime = DateTime.strptime(auth_headers["expiry"], "%s")
      current_user_uid = auth_headers["uid"]
      current_user = Rails.cache.fetch("users/uid/#{current_user_uid}", expires_in: 24.hours) do
        puts "cache: fetching current_user: #{current_user_uid}"
        User.find_by(uid: current_user_uid)
      end

      if current_user &&
       current_user.tokens.has_key?(auth_headers["client"]) &&
       expiration_datetime > DateTime.now

       @current_user = current_user
      end

      @current_user
    end
  end
end