class PageSerializer < ActiveModel::Serializer
  attributes :id, :name, :relative_path, :sub_page_slugs, :data_type, :dataset, :parent

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
      object.parent_page.relative_path
    end
  end

  def dataset
    if !!object.dataset
      object.dataset.as_json.keys.each_with_object({}) do |key, obj|
        if key == "_id"
        else
          obj[key] = object.dataset[key]
        end
      end
    end
  end
end
