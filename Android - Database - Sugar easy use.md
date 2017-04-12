        在看过三个版本（对就是版本）greenDao教程最终发现AIDE无法使用带有注解的库的时候，我是稍有点绝望的。

        同时也萌发了自己对网络教程的感慨：还是看官方文档吧官方文档我爱你。

        然后呢，不想用sqlite只好自己继续寻数据库了，于是找到了sugar。
         


# 正文

先把github放出来，很多东西自己看就够了。
>  github : [http://satyan.github.io/sugar/](http://satyan.github.io/sugar/)

ps : 在我自己浏览的时候好像没有看见需要在使用开始和结束的时候调用：

```
SugarContext.init(this);
SugarContext.terminate();
```
这两个方法。

在github上有下载,我用的是gradle。

接下来 
## 简单操作

### 插入

-  创建实例
   只需要新建一个类来继承 SugarRecord这个类，然后在类中声明变量等即可，如下：

```
public class MyRed extends SugarRecord
{
	private String mDesc;
	
	private String mUrl;
	
	private String mWho;
	
	private String mThink;
	
	public MyRed(){
		
	}
	
	public MyRed(String desc,  String url, String who, String think){
		setDesc(desc);
		setUrl(url);
		setWho(who);
		setThink(think);
	}

	public void setThink(String mThink)
	{
		this.mThink = mThink;
	}

	public String getThink()
	{
		return mThink;
	}


	public void setDesc(String mDesc)
	{
		this.mDesc = mDesc;
	}

	public String getDesc()
	{
		return mDesc;
	}

	public void setUrl(String mUrl)
	{
		this.mUrl = mUrl;
	}

	public String getUrl()
	{
		return mUrl;
	}

	public void setWho(String mWho)
	{
		this.mWho = mWho;
	}

	public String getWho()
	{
		return mWho;
	}}


```

 -  在AndroidManifest.xml中配置


```
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.kfdykme.mered.myred">


	<meta-data android:name="DATABASE" android:value="sugar_myred.db" />
	<meta-data android:name="VERSION" android:value="1" />
	<meta-data android:name="QUERY_LOG" android:value="true" />
	<meta-data android:name="DOMAIN_PACKAGE_NAME" android:value="com.kfykme.sugar" />
	

</manifest>


```

android:value 的值随自己需要更改。

- 初始化
在使用前需要调用上文提到的两个方法。
``` 


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
		      SugarContext.init(this);
	
		
    }
```
```

	@Override
	protected void onDestroy()
	{
		// TODO: Implement this method
		super.onDestroy();
		
		SugarContext.terminate();
		
	}
	

```

我是在主activity的onCreate() 和onDestory()中调用的方法。

4. 保存
 需要调用.save()方法。

```  java
mMyRedPresenter.saveMyRed(
						new MyRed(
								  mEditTextDesc.getText().toString(),
								  mEditTextUrl.getText().toString(),
								  mEditTextWho.getText().toString(),
								  mEditTextThink.getText().toString()));

```
将四个EditText中的文本作为参数，new一个 MyRed ，然后传入方法saveMyRed中

```
@Override
	public void saveMyRed(MyRed myRed)
	{
		if(!myRed.getDesc().isEmpty()
			&& (myRed.getUrl().length() > 5)
			&& !myRed.getWho().isEmpty()){
			
			 myRed.save();
			 Toast.makeText(mView,"Saved",Toast.LENGTH_SHORT).show();
			} else {

				Toast.makeText(mView,"Saved failed",Toast.LENGTH_SHORT).show();
			}
		// TODO: Implement this method
	}

```

稍作判断后觉定是否存入数据库。


### 查询

嗯 通过调用MyRed的


```
					MyRed.listAll(MyRed.class);

```
方法即可获取一个List<MyRed> 然后查询操作请随意。

### 更新

在通过listAll()获取的List<MyRed>中获取MyRed类，然后用setXXX()方法改变对应值后再使用MyRed.save()方法即可。
MyRed.save()会自动判断是新数据还是更新数据。

### 删除

同上获取MyRed类变量后调用MyRed.delete()即可。



##### 备注1 
   简单使用嘛，就这样了。

#####  备注2
    空构造空构造方法很重要  
#####  备注3 
    下一次研究一下如何建立多个表









