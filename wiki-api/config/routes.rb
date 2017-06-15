Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :api_wikis, only: [:index, :create]
      resources :pages, only: [:index, :create]

      get '/api_wikis/:slug', to: 'api_wikis#show'
      patch '/api_wikis/:slug', to: 'api_wikis#update'
      delete '/api_wikis/:slug', to: 'api_wikis#delete'
      get '/pages/*relative_path/dataset', to: 'datasets#show'
      patch '/pages/*relative_path/dataset', to: 'datasets#update'
      get '/pages/*relative_path', to: 'pages#show'
      patch '/pages/*relative_path', to: 'pages#update'
      delete '/pages/*relative_path', to: 'pages#delete'
      post '/auth', to: 'auth#create'
      get '/auth', to: 'auth#show'
      post '/signup', to: 'sign_up#create'
    end
  end
end

# get '/*relative_path', to: ...
