class SetPdWorkshopDailySurveysFormDataNotNull < ActiveRecord::Migration[5.0]
  def change
    change_column_null :pd_workshop_daily_surveys, :form_data, false

    reversible do |dir|
      dir.up do
        change_column :pd_workshop_daily_surveys, :form_id, :integer, limit: 8
        change_column :pd_workshop_daily_surveys, :submission_id, :integer, limit: 8
      end
      dir.down do
        change_column :pd_workshop_daily_surveys, :form_id, :integer
        change_column :pd_workshop_daily_surveys, :submission_id, :integer
      end
    end
  end
end
