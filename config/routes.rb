Rails.application.routes.draw do
  # We've disabled omniauth
  mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks], controllers: {
          registrations:  'api/v1/registrations'
        }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root 'api/v1/users#index'

  # token auth routes available at /api/v1/auth
  namespace :api do
    namespace :v1 do
      resources :users do
        get 'posts', on: :member
        post 'follow', to: :member
      end
      resources :posts do
        post 'react', on: :member
      end
      get '/feed', to: 'users#feed'
      get '/feed/after/:last_post_id', to: 'users#feedAfter'
    end
  end
  
  # collect bottleneck data
  get '/flame/:name', to: 'api/v1/api#flame'
  # redirect all unknown to root
  get '*path', to: 'api/v1/api#home'
end
