class Channel < ApplicationRecord
  belongs_to :post
  
  validates :name, length: {maximum: 21}, presence: true
end
