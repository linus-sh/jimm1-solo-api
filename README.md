# まえがき

このリポジトリはサーバー構築、及び RESTful API の勉強のために作成されたものです。
このリポジトリに含まれる一切はコードクリサリスの生徒だった際に作成したものです。
あくまで学習用に作成したものなので使用する際はその点留意してください。
またこのリポジトリのに含まれる一切の使用に関して、問題、障害など発生しても作者は一切の責任を負いかねますので、使用にあたっては十分にご留意ください。

# 使用技術

このプログラムは JavaScript と NodeJs ライブラリを用いて作成しました。
使用したパッケージ等は以下のとおりです。
・NodeJS :`https://nodejs.org/ja/`
・Express :`https://expressjs.com/`
・postgress :`https://www.postgresql.org/`
・knex :`http://knexjs.org/`

# 環境構築

## 依存パッケージダウンロード

NodeJS(`https://nodejs.org/ja/`)と Postgress(`https://www.postgresql.org/`)がインストールされていない場合は、それぞれ公式サイトからダウンロード、インストールしてください。

インストールが完了したらターミナルで`yarn`を実行して、依存パッケージをインストールしてください。

## サーバー起動

NodeJS と Express を用いてサーバーを`lcoalhost`に構築します。
ターミナルで`yarn dev`を実行すると、`localhost:3000`でサーバーが起動します。

## DB セットアップ

このリポジトリでは postgres を利用してデータベースを構築します。作成したデータベースに対して各 API がアクセスしてデータの取得、登録、更新、削除を行います。
Postgress のインストール後、ターミナルで以下のコマンドを実行して、データベースを作成してください。
`echo "CREATE DATABASE solo-api;" | psql`

### マイグレーション / ロールバック

それぞれターミナルから`yarn migrate`、`yarn rollback`のコマンドで実行できます。
`yarn migrate`を実行すると以下のテーブルが作成されます.

・users
"id" : interger, autoincrement, notnullable, index
"username" : string(maxmam 20 chars), notNullable,unique,index
"height" : float(8 byte, 4 digits), notNullable
"create_at" : timestamp, notNullable, default(date.now())

・records
"id" : interger, autoincrement, notnullable, index
"user_id" : integer, references(table: "users", culomn: "id"),notNullable
"date" : date, notNullable
"weights" : float(8 byte, 3 digits), notNullable
"bmi" : float(8 byte, 3 digits), notNullable
"sleeping" : float(8 byte, 3 digits), notNullable
"record_at" : timestamp, notNullable, default(date.now())

### シードデータ挿入

ターミナルで`yarn seed`を実行すると、動作確認用の初期データをデータベースに挿入できます。

# 各 API の動作

サーバー起動状態で`lcoalhost:3000`にアクセスすると各 API の動作確認用のボタンを配置した HTML ページが表示されます。

## users テーブル関連

・「Get User List」ボタン
users テーブルに登録された全ユーザーデータを取得します。
`http://localhost:3000/api/users`に対して GET メソッドを実行します。

・「Register New User」ボタン
users テーブルに新規ユーザーを追加します。
`http://localhost:3000/api/users`に対して以下の形式で新規ユーザー情報を含んだ body を json 形式で POST すると実行されます。

body
{
name: new_user_name,
height: nse_users_height
}

・「Fix User Data」ボタン
登録済みのユーザー情報を更新します。
`http://localhost:3000/api/users`に対して以下の形式で新規ユーザー情報を含んだ body を json 形式で PATCH すると実行されます。一度に変更できるのは username と height のどちらか一方のみです。
body
{
name :target_user_name,
newUserName :new_user_name,
newHeight:　 new_user_height
}

・「Delete User Data」ボタン
登録済みユーザーから指定のユーザーを削除します。
`http://localhost:3000/api/users/:name`に対して DELETE をすると実行されます。対象のユーザーは`:name`で指定 します。

## recoeds テーブル関連

※以下は未実装です

・「Get Record By User」ボタン
指定したユーザーの記録を取得します。
`http://localhost:3000/api/record/:id`に対して GET すると実行されます。対象のユーザーは`:id`でユーザー ID で指定します。

・「Register New Record」ボタン
指定したユーザーの健康情報を登録します。
`http://localhost:3000/api/record/:name` に対して以下の形式で新規ユーザー情報を含んだ body を json 形式で POST すると実行されます。対象のユーザーは`:name`で指定します。

body
{
date: "target_record_Datae",
weights: "target_weight",
sleeping: "target_sleep_time(hour)"
},

・「Fix record」ボタン
登録済みの健康情報を修正します。
`http://localhost:3000/api/record/:id` に対して以下の形式で新規ユーザー情報を含んだ body を json 形式で PATACH すると実行されます。対象の record の id は`:id`で指定します。一度の PATCH で修正できるのは date,weights,sleeping のうち一つだけです。

body
{
date: "target_record_Datae",
weights: "target_weight",
sleeping: "target_sleep_time(hour)"
},

・「Delete recorde」ボタン
健康管理情報を削除します。
`http://localhost:3000/api/record/:name/:date` に対して DELETE すると実行されます。対象のユーザーは`:name`で、日付を`ddate`で指定します。
