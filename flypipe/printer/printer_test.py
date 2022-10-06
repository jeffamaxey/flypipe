from flypipe.data_type import Decimal, Integer

from flypipe.datasource.spark import Spark
from flypipe.node import node
from flypipe.schema.column import Column
from flypipe.schema.schema import Schema

import pandas as pd

from tests.utils.spark import spark

spark.sql("create database if not exists raw")
spark.sql("create view raw.table as select 1 as col1, 2 as col2, 3 as col3, 4 as col4, 5 as col5")


@node(
    type="pyspark",
    dependencies=[
        Spark.table("raw.table").select('col1', 'col2', 'col3', 'col5')
    ],
    output=Schema([
        Column('col1', Decimal(10, 2)),
        Column('col2', Decimal(10, 2)),
        Column('col3', Decimal(10, 2)),
    ]))
def t1(table):
    return table

@node(type='pandas',
      dependencies=[t1.select('col3', 'col1')],
      output=Schema([
          Column('col1', Integer()),
      ]))
def t2(t1):
    return t1

@node(type='pandas',
      dependencies=[t1.select('col2')],
      output=Schema([
          Column('col2', Integer()),
      ]))
def t3(t1):
    return t1

@node(type='pandas',
      tags=['model', 'split'],
      dependencies=[
          t2.select('col1'),
          t3.select('col2')
      ],
      output=Schema([
          Column('col1', Integer()),
      ]))
def t4(t2, t3):
    return t2

@node(type='pandas',
      tags=['model', 'train'],
      dependencies=[
          t4.select('col1'),
          t1.select('col2'),
      ],
      output=Schema([Column('col3', Integer())]))
def t5(t1):
    return t1

@node(type='pandas_on_spark',
      dependencies=[
          t1.select('col2')
      ],
      output=Schema([Column('col4', Integer())]))
def t6(t1):
    return t1


@node(
    type="pyspark",
    dependencies=[
        Spark.table("raw.table").select('col2', 'col4')
    ],
    output=Schema([
        Column('col2', Decimal(10, 2))
    ]))
def t7(table):
    return table

@node(type='pandas',
      dependencies=[
          t4.select('col1'),
          t6.select('col4'),
          t5.select('col2'),
          t7.select('col2'),
      ],
      output=Schema([Column('col1', Integer())]))
def t8(t4, t5, t6, t7):
    return t4





with open('test.html', 'w') as f:
    html = t8.inputs(t4=pd.DataFrame(data=[{'col1': [1]}])).html(width=-1, height=-1)
    f.writelines(html)

