class VisiblePageSerializer < ActiveModel::Serializer
  attributes :name, :relative_path, :data, :parent, :slug

  def parent
    if object.has_no_parent?
      object.api_wiki.slug
    else
      object.parent_page.relative_path
    end
  end

  def data
    data = {}
    if object.dataset
      data = object.dataset.as_json.keys.each_with_object({}) do |key, obj|
        if key == "_id"
        else
          obj[key] = object[key]
        end
      end
    end
  end

  def sub_pages
    sub_pages = []
    if object.sub_pages
      sub_pages = object.sub_pages.map do |sub_page|
        VisibleSubPageSerializer.new(sub_page).attributes
      end
    end
    sub_pages
  end


  has_many :sub_pages, each_serializer: :visible_sub_page_serializer
end
