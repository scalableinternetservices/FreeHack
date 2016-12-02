
module Api::V1
  class UsersController < ApiController
    before_action :set_user, only: [:show, :update, :destroy, :posts]
    before_action :authenticate_current_user, only: [:feed, :recent, :follow, :connections, :show, :posts, :update, :destroy]
    
    POSTS_PER_PAGE = 10

    # GET /api/v1/users
    def index
      render json: User.all
    end
  
    # GET /api/v1/users/1
    def show
      render_as_user(@user)
    end
    
    # GET /api/v1/users/1/posts
    def posts
      posts = Rails.cache.fetch("users/#{@user.id}/posts", expires_in: 10.minutes) do
        puts "cache: fetching post for user #{@user.id}"
        Post.where(user_id: @user.id).includes(:user).all
      end
      render_as_user(posts)
    end
    
    # GET /api/v1/feed
    def feed
      lastPostID = params[:bookmark]
      if lastPostID
        posts = Rails.cache.fetch("users/#{@current_user.id}/feed/after/#{lastPostID}", expires_in: 1.hour) do
          puts "cache: fetching feed after #{lastPostID} for user #{@current_user.id}"
          last_created_at = Post.find(lastPostID).created_at
          postIds = Follow.where(follower_id: @current_user.id).joins(followed: :posts).select('posts.id').map(&:id)
          Post.where("id IN (?) AND created_at < ?", postIds, last_created_at).includes(:user).limit(POSTS_PER_PAGE).to_a
        end
      else
        posts = Rails.cache.fetch("users/#{@current_user.id}/feed", expires_in: 10.minutes) do
          postIds = Follow.where(follower_id: @current_user.id).joins(followed: :posts).select('posts.id').map(&:id)
          Post.where("id IN (?)", postIds).includes(:user).limit(POSTS_PER_PAGE).all
        end
      end
      render_as_user(posts)
    end
    
    # GET /api/v1/feed
    def recent
      lastPostID = params[:bookmark]
      if lastPostID
        posts = Rails.cache.fetch("global/posts/after/#{lastPostID}", expires_in: 1.hour) do
          puts "cache: fetching global posts after #{lastPostID}"
          last_created_at = Post.find(lastPostID).created_at
          Post.where("created_at < ?", last_created_at).includes(:user).limit(POSTS_PER_PAGE).to_a
        end
      else
        posts = Rails.cache.fetch("global/posts", expires_in: 10.minutes) do
          Post.all.includes(:user).limit(POSTS_PER_PAGE).to_a
        end
      end
      render_as_user(posts)
    end
    
    # GET /api/v1/users/1/follow
    def follow
      # 'follow' / 'unfollow'
      type = params[:type]
      user_id = params[:user_id]
      
      if type == "follow"
        follow = Follow.new(followed_id: user_id, follower_id: @current_user.id)
        if follow.save
          render_as_user(User.find(user_id))
        else 
          render json: {type: "error", msg: follow.errors}, status: :unprocessable_entity
        end
      else
        if Follow.destroy_all(followed_id: user_id, follower_id: @current_user.id)
          render_as_user(User.find(user_id))
        else
          render json: {type: "error", msg: "failed to follow user"}
        end
      end
    end
    
    def connections
      friends = Rails.cache.fetch("users/#{@current_user.id}/connections", expires_in: 1.hour) do
        Follow.where("follower_id == ? OR followed_id == ?",current_user.id,current_user.id).limit(POSTS_PER_PAGE)
      end
      all_connections = []
      friends.each do |friend|
        all_connections.push({"follower":friend.follower_id,"following":friend.followed_id,"connectionId":friend.id})
      end
      render_as_user(all_connections)
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