# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_16_222545) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "audio_types", force: :cascade do |t|
    t.string "name", limit: 40, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "interface_id"
    t.index ["interface_id"], name: "index_audio_types_on_interface_id"
    t.index ["name"], name: "index_audio_types_on_name", unique: true
  end

  create_table "boxes", force: :cascade do |t|
    t.jsonb "settings"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "patch_id", null: false
    t.integer "inlets_count"
    t.integer "outlets_count"
    t.integer "x", default: 0, null: false
    t.integer "y", default: 0, null: false
    t.bigint "audio_node_id", null: false
    t.index ["audio_node_id"], name: "index_boxes_on_audio_node_id"
    t.index ["patch_id"], name: "index_boxes_on_patch_id"
  end

  create_table "inlets", force: :cascade do |t|
    t.bigint "box_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "lines_count"
    t.index ["box_id"], name: "index_inlets_on_box_id"
  end

  create_table "interfaces", force: :cascade do |t|
    t.string "name", limit: 40, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_interfaces_on_name", unique: true
  end

  create_table "lines", force: :cascade do |t|
    t.bigint "inlet_id", null: false
    t.bigint "outlet_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["inlet_id", "outlet_id"], name: "index_lines_on_inlet_id_and_outlet_id", unique: true
    t.index ["inlet_id"], name: "index_lines_on_inlet_id"
    t.index ["outlet_id"], name: "index_lines_on_outlet_id"
  end

  create_table "outlets", force: :cascade do |t|
    t.bigint "box_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "lines_count"
    t.index ["box_id"], name: "index_outlets_on_box_id"
  end

  create_table "patches", force: :cascade do |t|
    t.string "name"
    t.string "author"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "boxes_count"
  end

  add_foreign_key "audio_types", "interfaces"
  add_foreign_key "boxes", "audio_types", column: "audio_node_id"
  add_foreign_key "boxes", "patches"
  add_foreign_key "inlets", "boxes"
  add_foreign_key "outlets", "boxes"
end
