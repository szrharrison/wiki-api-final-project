class AccountSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username

  def id
    object.id.to_s
  end
end
