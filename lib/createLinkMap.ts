import * as MDAST from "mdast";

import { Note } from "./Note";

export interface LinkContext {
  link: MDAST.Link;
  context: MDAST.BlockContent[]
}

export default function createLinkMap(notes: Note[]) {
  const linkMap: Map<string, Map<string, LinkContext>> = new Map();
  for (const note of notes) {
    for (const link of note.links) {
      const targetTitle = link.targetTitle;
      let backlinkEntryMap = linkMap.get(targetTitle);
      if (!backlinkEntryMap) {
        backlinkEntryMap = new Map();
        linkMap.set(targetTitle, backlinkEntryMap);
      }
      let contextList = backlinkEntryMap.get(note.title);
      if (!contextList) {
        contextList = {
          link: link.link,
          context: []
        };
        backlinkEntryMap.set(note.title, contextList);
      }
      if (link.context) {
        contextList.context.push(
          link.context
        );
      }
    }
  }

  console.log("%j", linkMap);
  return linkMap;
}
