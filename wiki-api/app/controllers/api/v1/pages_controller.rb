class Api::V1::PagesController < ApplicationController
  before_action :set_page, only: [:show, :update, :delete]
  before_action :authorize_account!
  def index
    pages = current_account.api_wikis.pages
    render json: pages, each_serializer: WikiPageSerializer
  end

  def show
    render json: @page
  end

  def create
    if page = Page.create(page_params)
      render json: page
    else
      render json: { error: page.errors.full_messages }
    end
  end

  def update
    @page.name = page_params[:name]
    @page.dataset = page_params[:dataset]

    if @page.save
      render json: @page
    else
      render json: { error: @page.errors.full_messages }
    end
  end

  def delete
    @page.destroy
    if Page.find(@page.id)
      render json: { error: 'Sorry, we were unsuccessful in deleting your page' }
    else
      render json: { message: 'Successfully deleted.' }
    end
  end


  private

  def set_page
    @page = Page.find_by(relative_path: params[:relative_path])
  end

  def page_params
    params.permit!
  end
end
