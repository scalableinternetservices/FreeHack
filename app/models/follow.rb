class Follow < ApplicationRecord
  belongs_to :follower, :class_name => 'User', :foreign_key => 'follower_id'
  belongs_to :followed, :class_name => 'User', :foreign_key => 'followed_id'
  validates_uniqueness_of :follower_id, :scope => :followed_id

  after_commit :flush_cache

  def flush_cache
    puts "cache: deleting followers for user #{self.followed_id}"
    Rails.cache.delete("users/#{self.followed_id}/followers")
  end
end
