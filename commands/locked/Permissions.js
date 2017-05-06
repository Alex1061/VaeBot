module.exports = Cmds.addCommand({
	cmds: [";perms "],

	requires: {
		guild: true,
		loud: false
	},

	desc: "Get guild and channel permissions for a user",

	args: "([@user] | [id] | [name])",

	example: "vae",

	///////////////////////////////////////////////////////////////////////////////////////////

	func: (cmd, args, msgObj, speaker, channel, guild) => {
		var member = Util.getMemberByMixed(args, guild);
		if (member == null) {
			Util.commandFailed(channel, speaker, "User not found");
			return;
		}
		var guildPerms = member.permissions.serialize();
		var channelPerms = member.permissionsIn(channel).serialize();

		var guildValue = [];
		var channelValue = [];

		for (var permName in guildPerms) {
			if (!guildPerms.hasOwnProperty(permName)) continue;
			var hasPerm = guildPerms[permName];
			if (!hasPerm) continue;
			guildValue.push(permName);
		}

		for (var permName in channelPerms) {
			if (!channelPerms.hasOwnProperty(permName)) continue;
			var hasPerm = channelPerms[permName];
			if (!hasPerm) continue;
			channelValue.push(permName);
		}

		Util.sortPerms(guildValue);
		Util.sortPerms(channelValue);

		var sendEmbedFields = [
			{name: "Guild Permissions", value: "​\n" + guildValue.join("\n\n"), inline: false},
			{name: "Channel Permissions", value: "​\n" + channelValue.join("\n\n"), inline: false}
		];

		Util.sendEmbed(channel, Util.capitalize2(member.displayName + "'s Permissions"), null, Util.makeEmbedFooter(speaker), null, 0x00BCD4, sendEmbedFields);
	}
});