class Post < ApplicationRecord
  belongs_to :user
  has_many :channels, :dependent => :destroy
  has_many :wow_reactions, :dependent => :destroy
  has_many :like_reactions, :dependent => :destroy
  
  default_scope { order(created_at: :desc) }
  
  validates :content, length: {maximum: 160}, presence: true, :format => { :with => @@emojiPattern,
    :message => "Only Emojis" }
  
  after_commit :flush_cache

  def flush_cache
    puts "cache: deleting post #{self.id}"
    Rails.cache.delete("posts/#{self.id}")
    
    puts "cache: deleting posts for user #{self.user_id}"
    Rails.cache.delete("users/#{self.user_id}/posts")
  end
end
