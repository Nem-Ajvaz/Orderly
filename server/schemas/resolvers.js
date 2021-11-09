const { AuthenticationError } = require("apollo-server-express");
const { User, Priority } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    async priorities(root, args, ctx, info) {
      if (!ctx.user) {
        throw new Error("Unautherised");
      }

      console.log(ctx.user);

      const { _id } = ctx.user;

      return Priority.find({ userId: _id });
    },
  },

  Mutation: {
    async addUser(root, { username, email, password }) {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    async login(root, { email, password }) {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    async createPriority(root, args, ctx, info) {
      const { user } = ctx;
      if (!user) throw new Error("The user doesn't exist");

      const {
        zendesk,
        title,
        description,
        jira,
        dateCreated,
        customer,
        currentStatus,
        sdm,
        comment,
      } = args.data;

      if (
        !zendesk ||
        !title ||
        !description ||
        !jira ||
        !dateCreated ||
        !customer ||
        !currentStatus ||
        !sdm ||
        !comment
      )
        throw new Error("Invalid args");

      return await Priority.create({ ...args.data, userId: user._id });
    },
    async editPriority(root, args, ctx, info) {
      console.log(args);
      const {
        zendesk,
        title,
        description,
        jira,
        dateCreated,
        customer,
        comment,
        currentStatus,
        sdm,
      } = args.data;

      if (
        !comment &&
        !currentStatus &&
        !sdm &&
        !zendesk &&
        !title &&
        !description &&
        !jira &&
        !dateCreated &&
        !customer
      ) {
        throw new Error("Invalid args");
      }

      return await Priority.findOneAndUpdate(
        { _id: args.data.id },
        { ...args.data },
        { new: true }
      );
    },
    async changePriorityStatus(root, args, ctx, info) {
      const { data } = args;

      console.log(data);
      return Priority.findOneAndUpdate(
        { _id: data.id },
        { currentStatus: data.newStatus }
      );
    },
  },
};

module.exports = resolvers;
