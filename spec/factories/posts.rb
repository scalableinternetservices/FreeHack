FactoryGirl.define do
  factory :post do
    content "MyText"
    user nil
    repost_id 1
    original_id 1
  end
end
