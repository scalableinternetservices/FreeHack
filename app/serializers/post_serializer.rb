class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :user
  attributes :id, :content
  belongs_to :user, embed: :id, include: false
end
