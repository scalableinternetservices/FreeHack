class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :wow_count, :like_count, :liked, :wowed
  belongs_to :user, embed: :id, include: false
  
  def wow_count
    return Rails.cache.fetch("posts/#{object.id}/wow_count") do
      puts "cache: fetching wow count for post: #{object.id}"
      object.wow_reactions.size
    end
  end
  
  def like_count
    return Rails.cache.fetch("posts/#{object.id}/like_count") do
      puts "cache: fetching like count for post: #{object.id}"
      object.like_reactions.size
    end
  end
  
  def liked
    current_user_id = @instance_options[:current_user_id]
    likes = Rails.cache.fetch("users/#{current_user_id}/likes", expires_in: 24.hours) do
      puts "cache: fetching likes for user: #{current_user_id}"
      LikeReaction.where(user_id: current_user_id).pluck(:post_id)
    end
    
    postLikes = likes.select { |likeID| likeID == object.id }
    if postLikes.count > 0
      return "true"
    else
      return "false"
    end
  end
  
  def wowed
    current_user_id = @instance_options[:current_user_id]
    wows = Rails.cache.fetch("users/#{current_user_id}/wows", expires_in: 24.hours) do
      puts "cache: fetching wows for user: #{current_user_id}"
      WowReaction.where(user_id: current_user_id).pluck(:post_id)
    end
    
    postWows = wows.select { |wowID| wowID == object.id }
    if postWows.count > 0
      return "true"
    else
      return "false"
    end
  end
end
