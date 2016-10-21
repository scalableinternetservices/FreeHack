Rails.application.routes.draw do
  # We've disabled omniauth
  mount_devise_token_auth_for 'User', at: 'auth', skip: [:omniauth_callbacks]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root 'api/users#index'
  
  constraints subdomain: 'api' do
  scope module: 'api' do
      resources :users
  end
end
end
