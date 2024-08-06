import {mountSuspended} from '@nuxt/test-utils/runtime'
import {expect, it} from "vitest";
import {BoardModelCard} from "#components";
import type {BoardModel} from "~/models/board-model";

it('can mount some component', async () => {
    const boardModel: BoardModel = {
        id: 'bm1',
        boardCount: 2,
        name: 'bm1 name',
        description: 'bm1 description',
        photoUrl: ''
    }

    const component = await mountSuspended(BoardModelCard, {props: {boardModel: boardModel}})

    expect(component.text()).toMatchInlineSnapshot('"bm1 namebm1 description"')
})