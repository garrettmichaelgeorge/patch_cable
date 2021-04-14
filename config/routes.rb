Rails.application.routes.draw do
  get 'box/update'
  resources :patches, only: [:index, :show, :create, :destroy]
  resources :boxes, only: [:edit, :update]

  root to: "static_pages#home"
  get "/about" => "static_pages#about"
end
