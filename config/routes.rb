Rails.application.routes.draw do
  resources :patches, only: [:index, :show, :create, :destroy]

  root to: "static_pages#home"
  get "/about" => "static_pages#about"
end
