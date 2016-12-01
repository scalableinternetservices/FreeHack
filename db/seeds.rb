# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Post.destroy_all
Follow.destroy_all
LikeReaction.destroy_all
WowReaction.destroy_all

firstUser_id = -1
firstPost_id = -1
lastPost_id = -1
lastUser_id = -1
(1..1000).each do |i|
    user = User.new(name: "user%d" % i, email: "user%d@example.com" % i, password: "password", bio: ":astonished:" * (i % 8))
    if !user.save
        puts user.bio
        puts user.errors.messages
    end
    
    postA = Post.create(user_id: user.id, content: ":astonished: " + ":love_hotel:" * (i % 3))
    postB = Post.new(user_id: user.id, content: ":astonished: " + ":sunflower:" * (i % 7))
    if !postB.save
        puts postB.content
        puts postB.errors.messages
    end
    Post.create(user_id: user.id, content: ":smirk: " + ":blush:" * (i % 4))
    LikeReaction.create(user_id: user.id, post_id: postA.id)
    WowReaction.create(user_id: user.id, post_id: postB.id)
    
    # Everyone follows first user
    if firstUser_id < 0
        firstUser_id = user.id
    else
        Follow.create(followed_id: firstUser_id, follower_id: user.id)
    end
    
    # Everyone wows first post
    if firstPost_id < 0
        firstPost_id = postA.id
    else
        WowReaction.create(user_id: user.id, post_id: firstPost_id)
    end
    
    # Everyone follows last user
    if lastUser_id > 0
        Follow.create(followed_id: lastUser_id, follower_id: user.id)
    end
    lastUser_id = user.id
    
    # Everyone likes last user's post
    if lastPost_id > 0 
        WowReaction.create(user_id: user.id, post_id: lastPost_id)
    end
    lastPost_id = postB.id
    
end
