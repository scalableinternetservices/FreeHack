class LikeReaction < ApplicationRecord
  belongs_to :post
  belongs_to :user
  validates_uniqueness_of :post_id, :scope => :user_id
  
  after_commit :flush_cache

  def flush_cache
    puts "cache: deleting likes for user #{self.user_id}"
    Rails.cache.delete("users/#{self.user_id}/likes")
    
    puts "cache: deleting like count for post #{self.post_id}"
    Rails.cache.delete("posts/#{self.post_id}/like_count")
  end
end
