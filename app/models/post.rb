class Post < ApplicationRecord
  belongs_to :user
  has_many :channels, :dependent => :destroy
  has_many :wow_reactions, :dependent => :destroy
  has_many :like_reactions, :dependent => :destroy
  
  default_scope { order(created_at: :desc) }
  
  validates :content, length: {maximum: 160}, presence: true, :format => { :with => self.emojiPattern,
    :message => "Only Emojis" }
end
