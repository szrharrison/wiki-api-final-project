class DatasetSerializer < ActiveModel::Serializer
  attributes :parent_path, :data, :parent, :name, :sub_page_slugs, :data_type

  def data
    object.as_json.keys.each_with_object({}) do |key, obj|
      if key == "_id"
      else
        obj[key] = object[key]
      end
    end
  end

  def name
    object.page.name
  end

  def sub_page_slugs
    object.page.sub_pages.slugs
  end

  def parent
    if object.page.has_no_parent?
      object.page.api_wiki.slug
    else
      object.page.parent_page.relative_path
    end
  end

  def data_type
    object.page.data_type
  end

  def parent_path
    object.page.relative_path
  end
end
