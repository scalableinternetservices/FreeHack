
module Api::V1
  class UsersController < ApiController
    before_action :set_user, only: [:show, :update, :destroy, :posts]
    # before_action :authenticate_user!, only: [:posts]

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