
module Api::V1
  class UsersController < ApiController
    before_action :set_user, only: [:show, :update, :destroy, :posts]
    before_action :authenticate_current_user, only: [:feed]

    # GET /api/v1/users
    def index
      render json: User.all
    end
  
    # GET /api/v1/users/1
    def show
      render json: @user
    end
    
    # GET /api/v1/users/1/posts
    def posts
      render json: @user.posts()
    end
    
    # GET /api/v1/feed/:last_post_id
    def feed
      #follows = Follow.where("follower_id = #current_user.id").select("followed_id")
      render json: @current_user
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def user_params
        params.fetch(:user, {})
      end

  end
end