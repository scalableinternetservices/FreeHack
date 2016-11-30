class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  
  validates :name, length: {maximum: 50} # , presence: true
  validates :email, presence: true, length: {maximum: 256}
  validates :bio, length: {maximum: 160}, :format => { :with => @@emojiPattern,
    :message => "Only Emojis" }
  
  ## note: should also require a name in sign_up if enforcing name uniqueness
  # validates_uniqueness_of :name
  
  has_many :posts, :dependent => :destroy
  has_many :wow_reactions, :dependent => :destroy
  has_many :like_reactions, :dependent => :destroy
  
  after_commit :flush_cache

  def flush_cache
    puts "cache: deleting user #{self.id}"
    Rails.cache.delete("users/#{self.id}")
  end
end
