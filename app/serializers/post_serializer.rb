class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :user, :wow_count, :like_count
  belongs_to :user, embed: :id, include: false
  
  def wow_count
    object.wow_reactions.size
  end
  
  def like_count
    object.like_reactions.size
  end
end
