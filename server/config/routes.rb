Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :user do
    resources :experiment
  end

  resources :experiment

  post '/auth/login', to: 'authentication#login'
  get '/auth/verify', to: 'authentication#verify'
end
