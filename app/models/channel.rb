class Channel < ApplicationRecord
  belongs_to :post
  
  validates :name, length: {maximum: 21}, presence: true
  
  validates_uniqueness_of :name, :scope => :post_id
end
