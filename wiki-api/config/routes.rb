Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :api_wikis, only: [:index]
      resources :pages, only: [:index]

      get '/api_wikis/:slug', to: 'api_wikis#show'
      get '/pages/*relative_path', to: 'pages#show'
      post '/auth', to: 'auth#create'
      post '/signup', to: 'sign_up#create'
    end
  end
end
