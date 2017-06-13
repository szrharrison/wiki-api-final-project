class Api::V1::PagesController < ApplicationController
  before_action :set_page, only: [:show, :update]
  before_action :authorize_account!
  def index
    pages = current_account.api_wikis.pages
    render json: pages, each_serializer: WikiPageSerializer
  end

  def show
    render json: @page
  end

  private

  def set_page
    @page = Page.find_by(relative_path: params[:relative_path])
  end
end
