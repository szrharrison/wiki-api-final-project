class PageSerializer < ActiveModel::Serializer
  attributes :id, :name, :relative_path, :data_type, :parent, :slug

  def id
    object.id.to_s
  end

  def parent
    if object.has_no_parent?
      object.api_wiki.slug
    else
      object.parent_page.relative_path
    end
  end

  has_many :sub_pages, each_serializer: :sub_page_serializer
end
