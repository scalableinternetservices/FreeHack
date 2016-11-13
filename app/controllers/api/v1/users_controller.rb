
module Api::V1
  class UsersController < ApiController
    before_action :set_user, only: [:show, :update, :destroy, :posts]
    before_action :authenticate_current_user, only: [:feed, :feedAfter, :follow]
    
    POSTS_PER_PAGE = 10

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
    
    # GET /api/v1/feed
    def feed
      postIds = Follow.where(follower_id: @current_user.id).joins(followed: :posts).select('posts.id').map(&:id)
      feedPosts = Post.where("id IN (?)", postIds).limit(POSTS_PER_PAGE)
      render json: feedPosts
    end
    
    # GET /api/v1/feed/after/:last_post_id
    def feedAfter
      last_created_at = Post.find(params[:last_post_id]).created_at
      postIds = Follow.where(follower_id: @current_user.id).joins(followed: :posts).select('posts.id').map(&:id)
      feedPosts = Post.where("id IN (?) AND created_at < ?", postIds, last_created_at).limit(POSTS_PER_PAGE)
      render json: feedPosts
    end
    
    # GET /api/v1/follow
    def follow
      # user_id for other user
      other_id = User.find(params[:other_id])
      # 'follow' / 'unfollow'
      type = params[:type]
      
      if type == "follow"
        follow = Follow.new(followed_id: other_id, follower: @current_user)
        if follow.save
          render json: {type:"follow", success: "true"}
        else 
          render json: {type:"follow", success: "false"}
        end
      else
        Follow.destroy_all(followed_id: other_id, follower: @current_user)
        render json: {type:"unfollow", success: "true"}
      end
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