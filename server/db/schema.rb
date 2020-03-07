# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_07_155311) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "experiments", force: :cascade do |t|
    t.datetime "time_start"
    t.datetime "time_end"
    t.string "target"
    t.string "metric"
    t.float "final_score"
    t.json "history"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "model"
    t.string "dataset"
    t.index ["user_id"], name: "index_experiments_on_user_id"
  end

  create_table "linear_regressions", force: :cascade do |t|
    t.boolean "standard_scale"
    t.float "learning_rate"
    t.integer "max_iterations"
    t.bigint "experiment_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["experiment_id"], name: "index_linear_regressions_on_experiment_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "role"
    t.string "name"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "experiments", "users"
  add_foreign_key "linear_regressions", "experiments"
end
