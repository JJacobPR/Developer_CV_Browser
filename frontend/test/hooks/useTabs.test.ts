import { renderHook } from "@testing-library/react";
import useTabs from "../../../frontend/src/hooks/useTabs";
import type { User } from "../../../frontend/src/models/User";
import { hasPermission } from "../../../frontend/src/router/Auth";
import { describe, it, expect, beforeEach, vi, Mock } from "vitest";

// Mock the hasPermission function
vi.mock("../../../frontend/src/router/Auth", () => ({
  hasPermission: vi.fn(),
}));

describe("useTabs", () => {
  const baseTab = { label: "Users", value: "" };

  const user: User = {
    id: 1,
    email: "test@example.com",
    role: "admin",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return only base tab if no permissions granted", () => {
    (hasPermission as Mock).mockReturnValue(false);

    const { result } = renderHook(() => useTabs(user));
    expect(result.current).toEqual([baseTab]);
  });

  it("should return base + Add User if create:users permission is granted", () => {
    (hasPermission as Mock).mockImplementation((_, perm) => perm === "create:users");

    const { result } = renderHook(() => useTabs(user));
    expect(result.current).toEqual([baseTab, { label: "Add User", value: "admin/add-user" }]);
  });

  it("should return base + My Projects if view:own-projects permission is granted", () => {
    (hasPermission as Mock).mockImplementation((_, perm) => perm === "view:own-projects");

    const { result } = renderHook(() => useTabs(user));
    expect(result.current).toEqual([baseTab, { label: "My Projects", value: "my-projects" }]);
  });

  it("should return base + Add Project if create:projects permission is granted", () => {
    (hasPermission as Mock).mockImplementation((_, perm) => perm === "create:projects");

    const { result } = renderHook(() => useTabs(user));
    expect(result.current).toEqual([baseTab, { label: "Add Project", value: "my-projects/add-project" }]);
  });

  it("should return all tabs if all permissions granted", () => {
    (hasPermission as Mock).mockReturnValue(true);

    const { result } = renderHook(() => useTabs(user));
    expect(result.current).toEqual([baseTab, { label: "Add User", value: "admin/add-user" }, { label: "My Projects", value: "my-projects" }, { label: "Add Project", value: "my-projects/add-project" }]);
  });
});
