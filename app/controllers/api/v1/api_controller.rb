
module Api::V1
  class ApiController < ApplicationController
    include ActionController::Cookies
    include DeviseTokenAuth::Concerns::SetUserByToken
    before_filter :authenticate_current_user, :cors_preflight_check
    after_filter :cors_set_access_control_headers
  
    # For all responses in this controller, return the CORS access control headers.
    
    def cors_set_access_control_headers
      headers['Access-Control-Max-Age'] = "1728000"
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end
    
    # If this is a preflight OPTIONS request, then short-circuit the
    # request, return only the necessary headers and return an empty
    # text/plain.
    
    def cors_preflight_check
      if request.method == :options
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        headers['Access-Control-Allow-Headers'] = '*'
        headers['Access-Control-Max-Age'] = '1728000'
        render :text => '', :content_type => 'text/plain'
      end
    end

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
      current_user = User.find_by(uid: auth_headers["uid"])

      if current_user &&
       current_user.tokens.has_key?(auth_headers["client"]) &&
       expiration_datetime > DateTime.now

       @current_user = current_user
      end

      @current_user
    end
  end
end