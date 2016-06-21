package com.zqoffice;

import com.facebook.react.ReactActivity;
import com.example.user.androidintent.IntentPackage;
import cn.reactnative.modules.jpush.JPushPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.imagepicker.ImagePickerPackage;
import android.content.Intent;
import com.chymtt.reactnativecalendar.CalendarPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.chymtt.reactnativedropdown.DropdownPackage;
import me.nucleartux.date.ReactDatePackage;
import com.rnfs.RNFSPackage;
import com.zqoffice.update.VersionCheckPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ZqOffice";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new IntentPackage(),
        new JPushPackage(),
        new CalendarPackage(),
        new ReactMaterialKitPackage(),
        new DropdownPackage(),
        new ReactDatePackage(this),
        new RNFSPackage(),
        new VersionCheckPackage(),
        new ImagePickerPackage(),
		new VectorIconsPackage(),
		new RNNetworkInfoPackage()
      );
    }
}
