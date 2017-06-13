class WikiPageSerializer < ActiveModel::Serializer
  attributes :id, :name, :relative_path, :data_type, :parent

  def id
    object.id.to_s
  end

  def sub_page_slugs
    object.sub_pages.slugs
  end

  def parent
    if object.has_no_parent?
      object.api_wiki.slug
    else
      object.parent_page.slug
    end
  end
end
