export default function MainHeader() {
  return (
    <>
      <div className="grid grid-cols-12 gap-2">
        <div className="tablet:col-span-1 minismartphone:col-span-2 m-auto">
          <img src="android-chrome-96x96.png" />
        </div>
        <div className="tablet:col-span-11 minismartphone:col-span-10 flex align-left">
          <div className="inline-block my-auto tablet:ml-4">
            <h1 className="text-lg">時間変換計算（HH:MM↔10進数）</h1>
            <small className="text-slate-600">HH:MM形式の時間と10進数形式の時間を相互に変換できます。かんたんな計算にも対応しています。</small>
          </div>
        </div>
      </div>
    </>
  )
}