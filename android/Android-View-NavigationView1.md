# NavigationView (1)  

   Today I learnt how to use navigationview to make a esay 导航栏

   ######      没错我还想顺便练练英语来着

   And I plan to write down some notes.
   Write in this order:
   ######      蹩脚 努力吧少年


需要写三个布局
menu
header of navigationview
your main layout

### menu layout：
menu/draw_view.xml
 
```  xml

<?xml version="1.0" encoding="utf-8"?>
<menu
	xmlns:android="http://schemas.android.com/apk/res/android">

	<group android:checkableBehavior="single">

		<item
			android:id="@+id/nav_home"
			android:title=" Home"
			android:icon="@drawable/image_1"/>

		<item
			android:id="@+id/nav_message"
			android:title=" Messages"/>
		<item
			android:id="@+id/nav_friends"
			android:title="F riends"/>
		<item
			android:id="@+id/nav__discussion"
			android:title=" Discussion"/>

	</group>
	<item android:title="Sub items">
		<menu>
			<item
				android:title="Sub item 1"/>
			<item
				android:title="Sub item 2"/>
		</menu>
	</item>

</menu>


```
### header layout

layout/nav_header.xml
``` xml

<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
	xmlns:android="http://schemas.android.com/apk/res/android"
	android:layout_width="match_parent"
	android:layout_height="192dp"
	android:background="?attr/colorPrimaryDark"
	android:paddingTop="30dp"
	android:paddingLeft=" 16dp"
	android:theme="@style/ThemeOverlay.AppCompat.Dark"
	android:gravity="center|left"
	android:orientation="vertical">

	<ImageView
		android:id="@+id/avatar"
		android:layout_width="64dp"
		android:layout_height="64dp"
		android:scaleType="centerCrop"
		android:src="@drawable/ic_head"/>
	
	<TextView
		android:layout_width="match_parent"
		android:layout_height="wrap_content"
		android:layout_marginTop="10dp"
		android:text="kfdykme"
		android:textAppearance="@style/TextAppearance.AppCompat.Body1"/>

</LinearLayout>


```


### main layout
layout/main.xml


``` xml

<?xml version="1.0" encoding="utf-8"?>
<android.support.v4.widget.DrawerLayout
    android:id="@+id/id_drawer_layout"
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:fitsSystemWindows="true"
>

        <TextView
            android:id="@+id/id_tv_content"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
			
            android:text="HelloWorld"
            android:textSize="30sp"/>
		

    <android.support.design.widget.NavigationView
        android:id="@+id/id_nv_menu"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_gravity="left"
        android:fitsSystemWindows="true"
        app:headerLayout="@layout/nav_header"
        app:menu="@menu/draw_view"
	/>

</android.support.v4.widget.DrawerLayout>

```

### 在activity 中实现：

``` java

package com.kfdykme.view.navigationview;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBar;
import android.support.v7.app.ActionBarActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.*;
import android.support.v4.view.*;
import android.support.v7.app.*;


public class Main extends AppCompatActivity
{

    private DrawerLayout mDrawerLayout;
    private NavigationView mNavigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
		
        setContentView(R.layout.main);

        mDrawerLayout = (DrawerLayout) findViewById(R.id.id_drawer_layout);
        mNavigationView = (NavigationView) findViewById(R.id.id_nv_menu);

		
        setupDrawerContent(mNavigationView);


    }

    private void setupDrawerContent(NavigationView navigationView)
    {
        navigationView.setNavigationItemSelectedListener(

			new NavigationView.OnNavigationItemSelectedListener()
			{

				@Override
				public boolean onNavigationItemSelected(MenuItem menuItem)
				{
					menuItem.setChecked(true);
					mDrawerLayout.closeDrawers();
					return true;
				}
			});
    }

}

```

