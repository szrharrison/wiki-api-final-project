class Api::V1::ApiWikisController < ApplicationController
  before_action :set_api_wiki, only: [:show, :update, :delete, :create_page]
  before_action :authorize_account!
  def index
    render json: current_account.api_wikis
  end

  def show
    render json: @api_wiki
  end

  def create
    @api_wiki = ApiWiki.new(api_wiki_params)
    @api_wiki.account = current_account
    if @api_wiki.save
      render json: @api_wiki
    else
      render json: { error: @api_wiki.errors.full_messages }
    end
  end

  def create_page
    api_wiki_page_params = params.require(:page).permit(:name)
    page = @api_wiki.pages.new(api_wiki_page_params)
    page.set_slug
    if page.save
      render json: page
    else
      render json: { error: page.errors.full_messages }
    end
  end


  def update
    @api_wiki.update(api_wiki_params)
    if @api_wiki.valid?
      render json: @api_wiki
    else
      render json: { error: @api_wiki.errors.full_messages }
    end
  end

  def delete
    @api_wiki.destroy
    if ApiWiki.find(@api_wiki.id)
      render json: { error: 'Sorry, we were unsuccessful in deleting your wiki' }
    else
      render json: { message: 'Successfully deleted.' }
    end
  end

  private

  def set_api_wiki
    @api_wiki = ApiWiki.find_by(slug: params[:slug])
  end

  def api_wiki_params
    params.require(:api_wiki).permit(:name, :documentation)
  end
end
