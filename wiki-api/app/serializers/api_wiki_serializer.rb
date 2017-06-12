class ApiWikiSerializer < ActiveModel::Serializer
  attributes :id, :account_id, :name, :slug, :pages

  def id
    object.id.to_s
  end
  def account_id
    object.account_id.to_s
  end
  def pages
    object.pages.all_deep.map do |page|
      {
        id: page.id.to_s,
        name: page.name,
        relative_path: page.relative_path
      }
    end
  end
end
