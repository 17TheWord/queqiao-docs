# 工具类

::: tip 版本提示
适用于 **QueQiao Core 0.7.0-beta.4** 及以上版本。
:::

工具类用于封装平台侧的重复代码，主要包含：

- 玩家对象 → `PlayerModel`
- 成就对象 → `AchievementModel`
- JSON → 平台消息组件
- 翻译组件的解析已统一放到 `PlatformContext#parseTranslateModel`，工具类不再自行解析

## 参考

::: details 点击展开

```java
package com.github.theword.queqiao.utils;

import com.github.theword.queqiao.PlatformContext;
import com.google.gson.JsonElement;
import io.github.theword.queqiao.core.event.model.PlayerModel;
import io.github.theword.queqiao.core.event.model.achievement.AchievementModel;
import io.github.theword.queqiao.core.event.model.achievement.DisplayModel;
import net.minecraft.advancements.Advancement;
import net.minecraft.advancements.DisplayInfo;
import net.minecraft.entity.player.EntityPlayerMP;
import net.minecraft.util.text.ITextComponent;
import net.minecraft.util.text.TextComponentString;
import net.minecraft.util.text.TextComponentTranslation;


public class ForgeTool {

    public static PlayerModel getForgePlayer(EntityPlayerMP forgeServerPlayer) {
        PlayerModel playerModel = new PlayerModel();
        playerModel.setNickname(forgeServerPlayer.getName());
        playerModel.setUuid(forgeServerPlayer.getUniqueID());
        playerModel.setAddress(forgeServerPlayer.getPlayerIP());
        playerModel.setHealth((double) forgeServerPlayer.getHealth());
        playerModel.setMaxHealth((double) forgeServerPlayer.getMaxHealth());
        playerModel.setExperienceLevel(forgeServerPlayer.experienceLevel);
        playerModel.setExperienceProgress((double) forgeServerPlayer.experience);
        playerModel.setTotalExperience(forgeServerPlayer.experienceTotal);
        playerModel.setOp(forgeServerPlayer.canUseCommand(4, "op"));
        playerModel.setWalkSpeed((double) forgeServerPlayer.getAIMoveSpeed());
        playerModel.setX(forgeServerPlayer.posX);
        playerModel.setY(forgeServerPlayer.posY);
        playerModel.setZ(forgeServerPlayer.posZ);
        return playerModel;
    }

    /**
     * 构造成就模型；标题/描述需要交给 PlatformContext 解析翻译组件。
     */
    public static AchievementModel getForgeAchievement(PlatformContext context, String nickname, Advancement advancement) {
        AchievementModel achievementModel = new AchievementModel();
        DisplayModel displayModel = new DisplayModel();
        if (advancement.getDisplay() == null) {
            return achievementModel;
        }

        achievementModel.setKey(advancement.getId().toString());
        DisplayInfo displayInfo = advancement.getDisplay();
        displayModel.setFrame(displayInfo.getFrame().toString());
        displayModel.setTitle(context.parseTranslateModel(displayInfo.getTitle()));
        displayModel.setDescription(context.parseTranslateModel(displayInfo.getDescription()));
        achievementModel.setDisplay(displayModel);

        TextComponentTranslation translation = new TextComponentTranslation(
                achievementModel.getTranslationKey(displayModel.getFrame()),
                new TextComponentString(nickname),
                advancement.getDisplayText()
        );
        achievementModel.setTranslation(context.parseTranslateModel(translation));
        return achievementModel;
    }

    public static ITextComponent buildComponent(JsonElement jsonElement) {
        return ITextComponent.Serializer.fromJsonLenient(jsonElement.toString());
    }
}
```

:::

::: tip
`getForgeAchievement` 依赖 `PlatformContext` 的翻译服务，因此调用时需要传入当前上下文。
:::
