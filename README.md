# miteneDownloader
Download jpg/mp4 files from mitene

みてねにアップロードした画像と動画をまとめてダウンロードします。

注意：1度にまとめてダウンロードできるのは、1ページに表示されている 25 個の画像/動画です。

      複数ページのファイルをダウンロードするには、複数回の操作が必要です。


コードの説明はこちら：

https://qiita.com/miworky/items/4d10824117527d115113


# ●使用方法

1)アプリケーションを起動する

2)ブラウザでみてねのブラウザ版のサイトにアクセスする

  ブラウザ版のサイトにアクセスするには、みてねアプリから招待する。

  「家族設定」->「家族一覧」->「家族を招待する」->「ブラウザ版で招待」

3)ブラウザでみてねのダウンロードしたいページに移動する

  URLの末尾に以下のように追加することで任意のページを表示できる：

  ?page=13

  この例だと、13ページめが表示される。
　
   なお、「?page=1」とすれば、先頭のページ（最新）が表示される。


4)ブラウザ上で右クリックして「ページのソースを表示」を選択する（※）

  （※）Chromeの場合

5)表示されたソースの 3 行目（window.gon={}で始まる行）をコピーして、アプリケーションのテキストボックスにペーストする

6)アプリケーションの「load」ボタンを押す

  ブラウザ版で表示したページの動画と画像の一覧が表示される。

  ファイル名は、「撮影日時_最初のコメント」（yyyy-mm-ddThhmmss_最初のコメント）となる。

    Note：このようなファイル名にすることで、動画編集ソフトに配置すれば撮影日順にタイムラインに配置できる。

ファイル名の右に表示される数字は、ファイルをアップロードしたユーザーのID。

この ID を見ることで誰がアップロードしたファイルなのかがわかる。


7)「Download All」ボタンを押す

ダウンロード先のフォルダを選択するダイアログが表示される。選択したフォルダに、表示されているすべてのファイルがダウンロードされる。

  Note: ファイルへのリンクには有効期限があります。

  3 でみてねのページを表示してから一定時間内に 7 の操作をしてください。
リンクの有効期限が切れていたら、ファイルは正しくダウンロードできません。
リンクの有効期限が切れていた時にダウンロードしたファイルの中身にはテキストでエラー内容が記載されています。この場合、再度 3 からやり直してください。


ほかのページのファイルをダウンロードするには、3-7 を繰り返す。





# ●開発環境構築方法

○Windows


1)Node.jsをインストールする

https://nodejs.org/

LTS版をインストールする。
インストーラーでは、すべて「Next」を選択する。

Node.js がインストールされたことを確認するには
コマンドプロンプトを起動して

      node -v

と入力する。

      v14.17.4

のようにバージョンが表示されればインストールされている。


2)yarnをインストールする

コマンドプロンプトから以下を実行する：

      npm install -g yarn

yarn がインストールされたことを確認するには、コマンドプロンプトから

       yarn --version

と入力する。

      1.22.11
      
のようにバージョンが表示されればインストールされている。



○Mac

1)Homebrew をインストールする

https://brew.sh/index_ja

Note: 以下の 2, 3 でエラー発生した場合は、ここからやり直すとよいかも。


2)nodebrew をインストールする

      brew install nodebrew

3)Node.js をインストールする

      nodebrew install-binary stable

使用するバージョンを設定する。

まず、インストールされたバージョンを確認し、次にそのバージョンを使用するコマンドを打つ：

      nodebrew ls

      v16.7.0

      current: none

       nodebrew use v16.7.0
      use v16.7.0

4)Node.js のパスを環境変数に登録する

      echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.zprofile

      source ~/.zprofile 

Node.js がインストールされたことを確認するには

      node -v

と入力する。

      v16.7.0

のようにバージョンが表示されればインストールされている。

5)yarnをインストールする

コマンドプロンプトから以下を実行する：

      npm install -g yarn

yarn がインストールされたことを確認するには、コマンドプロンプトから

      yarn --version

と入力する。

      1.22.11

のようにバージョンが表示されればインストールされている。




# ●ビルド準備

ソースコードのあるフォルダで以下を入力する：

      yarn install

これで必要なライブラリがダウンロードされる。


# ●実行手順

以下を実行すればアプリケーションが実行される：

      yarn run start



# ●パッケージの作成手順

○Windows
      
      yarn run build:win

○Mac
      
      yarn run build:mac





