
module Api::V1
  class PostsController < ApiController
    before_action :set_post, only: [:show, :update, :destroy, :react]
    before_action :authenticate_current_user, only: [:create, :update, :destroy, :react]
  
    # GET /posts
    def index
      render json: Post.all
    end
  
    # GET /posts/1
    def show
      render json: @post
    end
  
    # POST /posts
    def create
      @post = Post.new(user: @current_user, content: params[:content])
  
      if @post.save
        render json: @post, status: :created
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
    
    # POST /posts/1/react/:reaction
    def react
      type = params[:reaction]
      action = params[:action]
      if action == "react"
        if type == "wow"
          wow = WowReaction.new(post: @post, user: @current_user)
          if wow.save
            render json: @post
          else
            render json: wow.errors, status: :unprocessable_entity
          end
        elsif type == "like"
          like = LikeReaction.new(post: @post, user: @current_user)
          if like.save
            render json: @post
          else
            render json: like.errors, status: :unprocessable_entity
          end
        end
      else
        if type == "wow"
          if WowReaction.destroy_all(post: @post, user: @current_user)
            render json: @post
          else
            render json: {type: "unreact", success: "false"}
          end
        elsif type == "like"
          if LikeReaction.destroy_all(post: @post, user: @current_user)
            render json: @post
          else
            render json: {type: "unreact", success: "false"}
          end
        end
      end
    end
  
    # PATCH/PUT /posts/1
    def update
      if @post.user == @current_user && @post.update(post_params)
        render json: @post, current_user_id: @current_user.id
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /posts/1
    def destroy
      if @post.user == @current_user
        @post.destroy
      end
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def post_params
        params.fetch(:post, {})
      end
  end
end
