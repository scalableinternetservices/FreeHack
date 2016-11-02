class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :user
end
