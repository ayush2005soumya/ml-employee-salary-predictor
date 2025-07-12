from sqlalchemy import create_engine, Table, Column, Integer, String, Float, MetaData
import datetime

# Update with your credentials
DB_URI = "postgresql://postgres:ChatAyush#213@localhost:5432/salary_db"

engine = create_engine(DB_URI)
metadata = MetaData()

inputs_table = Table(
    "predictions", metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("age", Integer),
    Column("workclass", String),
    Column("education_num", Integer),
    Column("education", String),
    Column("marital_status", String),
    Column("occupation", String),
    Column("relationship", String),
    Column("race", String),
    Column("sex", String),
    Column("hours_per_week", Integer),
    Column("capital_gain", Integer),
    Column("capital_loss", Integer),
    Column("fnlwgt", Integer),
    Column("native_country", String),
    Column("income", String),               # Model output: "<=50K" or ">50K"
    Column("model", String),                # Model used
    Column("confidence", Float),            # Model confidence
)


# Create the table if it doesn't exist
metadata.create_all(engine)

# def insert_prediction(data_dict):
#     with engine.connect() as conn:
#         conn.execute(inputs_table.insert().values(**data_dict))

def insert_prediction(data_dict):
    conn = engine.connect()
    trans = conn.begin()
    try:
        conn.execute(inputs_table.insert().values(**data_dict))
        trans.commit()
    except:
        trans.rollback()
        raise
    finally:
        conn.close()
