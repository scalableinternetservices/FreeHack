class AddBioToUser < ActiveRecord::Migration[5.0]
  def change
    change_table :users do |t|
      t.text :bio
      t.text :tagline
      t.text :profile_color
    end
  end
end
